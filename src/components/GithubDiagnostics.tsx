import React, { useState, useEffect } from 'react';
import './GithubDiagnostics.css';

interface GitHubData {
    repos: number;
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
}

const CACHE_KEY = 'github_diagnostics_cache';
const CACHE_TIME_KEY = 'github_diagnostics_cache_time';
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in ms
const USERNAME = 'Sanjay1712KSK';

// Animated Number Component
const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const duration = 1200; // 1.2 seconds animation
        const startValue = 0;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Easing out quint
            const easeOut = 1 - Math.pow(1 - percentage, 5);
            const currentVal = Math.floor(startValue + (value - startValue) * easeOut);

            setDisplayValue(currentVal);

            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
            }
        };

        requestAnimationFrame(animate);
    }, [value]);

    return <span>{displayValue}</span>;
}

const GithubDiagnostics: React.FC = () => {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cacheTime = localStorage.getItem(CACHE_TIME_KEY);

                if (cachedData && cacheTime) {
                    const timeSinceCache = Date.now() - parseInt(cacheTime, 10);
                    if (timeSinceCache < CACHE_DURATION) {
                        setData(JSON.parse(cachedData));
                        setLoading(false);
                        return;
                    }
                }

                // Fetch user data for repos
                const userRes = await fetch(`https://api.github.com/users/${USERNAME}`);
                if (!userRes.ok) throw new Error('Failed to fetch user data');
                const userData = await userRes.json();

                // Fetch contributions
                const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`);
                if (!contribRes.ok) throw new Error('Failed to fetch contribution data');
                const contribData = await contribRes.json();

                const year = new Date().getFullYear();
                let totalContributions = 0;

                // Find total contributions for current year from summary if available, or just use total last year
                if (contribData.total && contribData.total[year]) {
                    totalContributions = contribData.total[year];
                } else if (contribData.total && contribData.total.lastYear) {
                    // Fallback for just some number to show
                    totalContributions = contribData.total.lastYear;
                }

                // Calculate streaks (simplified parsing of contributions array)
                // Note: jogruber API gives `{ contributions: [{ date, count }] }` sorted by date.
                let currentStreak = 0;
                let longestStreak = 0;
                let pStreak = 0;

                if (contribData.contributions) {
                    const todayStr = new Date().toISOString().split('T')[0];
                    let foundToday = false;

                    // Iterate backwards from today
                    for (let i = contribData.contributions.length - 1; i >= 0; i--) {
                        const day = contribData.contributions[i];
                        if (!foundToday && day.date > todayStr) continue;
                        if (!foundToday && day.date <= todayStr) foundToday = true;

                        if (day.count > 0) {
                            pStreak++;
                            longestStreak = Math.max(longestStreak, pStreak);
                            // If we haven't broken the streak since today
                            if (pStreak === currentStreak + 1) {
                                currentStreak = pStreak;
                            }
                        } else if (foundToday) {
                            // Streak broken, but we keep tracking for longest
                            if (currentStreak === pStreak) {
                                // Current streak ended
                            }
                            pStreak = 0;
                        }
                    }
                }

                const calculatedData: GitHubData = {
                    repos: userData.public_repos,
                    totalContributions,
                    currentStreak,
                    longestStreak
                };

                localStorage.setItem(CACHE_KEY, JSON.stringify(calculatedData));
                localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

                setData(calculatedData);
                setLoading(false);

            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError(true);
                setLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    if (loading) {
        return (
            <div className="gh-diagnostics-container scanning">
                <div className="gh-log">[SYSTEM] Connecting to GitHub API...</div>
                <div className="gh-log">[SYSTEM] Fetching diagnostic modules...</div>
                <div className="gh-loader"></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="gh-diagnostics-container error-state">
                <div className="gh-error-msg mono text-muted">System metrics temporarily unavailable.</div>
            </div>
        );
    }

    return (
        <div className="gh-diagnostics-container ready">
            <div className="gh-grid">
                <div className="gh-card">
                    <div className="gh-value"><AnimatedNumber value={data.totalContributions} /></div>
                    <div className="gh-label">Total Contributions</div>
                </div>
                <div className="gh-card">
                    <div className="gh-value"><AnimatedNumber value={data.currentStreak} /></div>
                    <div className="gh-label">Current Streak</div>
                </div>
                <div className="gh-card">
                    <div className="gh-value"><AnimatedNumber value={data.longestStreak} /></div>
                    <div className="gh-label">Longest Streak</div>
                </div>
                <div className="gh-card">
                    <div className="gh-value"><AnimatedNumber value={data.repos} /></div>
                    <div className="gh-label">Repositories</div>
                </div>
            </div>
        </div>
    );
};

export default GithubDiagnostics;
