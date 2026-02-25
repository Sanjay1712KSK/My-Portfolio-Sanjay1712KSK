import React, { useState, useEffect, useRef } from 'react';
import './GithubDiagnostics.css';

interface PushEvent {
    repo: string;
    commits: number;
    timeStr: string;
}

interface GitHubData {
    repos: number;
    totalContributions: number;
    currentStreak: number;
    longestStreak: number;
    events: PushEvent[];
    isCached: boolean;
}

const CACHE_KEY = 'github_diagnostics_cache_v3';
const CACHE_TIME_KEY = 'github_diagnostics_cache_time_v3';
const CACHE_DURATION = 6 * 60 * 60 * 1000;
const USERNAME = 'Sanjay1712KSK';

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const duration = 1200;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easeOut = 1 - Math.pow(1 - percentage, 5);
            setDisplayValue(Math.floor(value * easeOut));

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

const ProgressRing: React.FC<{ value: number, max: number, label: string }> = ({ value, max, label }) => {
    const radius = 55;
    const stroke = 3;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const [offset, setOffset] = useState(circumference);

    useEffect(() => {
        let startTime: number | null = null;
        const duration = 1200;
        const targetOffset = circumference - (Math.min(value / max, 1) * circumference);

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easeOut = 1 - Math.pow(1 - percentage, 5);
            setOffset(circumference - ((circumference - targetOffset) * easeOut));
            if (progress < duration) requestAnimationFrame(animate);
            else setOffset(targetOffset);
        };
        requestAnimationFrame(animate);
    }, [value, max, circumference]);

    return (
        <div className="ring-container">
            <div className="ring-grid-bg"></div>
            <svg height={radius * 2} width={radius * 2} className="ring-svg">
                <circle
                    stroke="rgba(255, 255, 255, 0.05)"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="var(--accent-cyan)"
                    fill="transparent"
                    strokeWidth={stroke + 1}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset: offset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="ring-progress glow-stroke"
                />
                <circle
                    stroke="rgba(0, 240, 255, 0.3)"
                    fill="transparent"
                    strokeWidth="1"
                    r={normalizedRadius + 8}
                    cx={radius}
                    cy={radius}
                    className="ring-outer-pulse"
                />
            </svg>
            <div className="ring-content">
                <div className="ring-value mono"><AnimatedNumber value={value} /></div>
            </div>
            <div className="ring-label mono">{label}</div>
        </div>
    );
};

const PulseGraph: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let offset = 0;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);

            for (let i = 0; i < canvas.width; i++) {
                const y = canvas.height / 2
                    + Math.sin(i * 0.02 + offset) * 8
                    + Math.sin(i * 0.05 + offset * 1.5) * 4
                    + (Math.random() * 2 - 1) * 0.5;
                ctx.lineTo(i, y);
            }

            ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
            ctx.stroke();
            ctx.shadowBlur = 0;

            offset += 0.02;
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="pulse-graph-container">
            <div className="pulse-label mono">CONTRIBUTION SIGNAL MONITOR</div>
            <canvas ref={canvasRef} width={800} height={60} className="pulse-canvas"></canvas>
        </div>
    );
};

const timeSince = (dateStr: string) => {
    const date = new Date(dateStr);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "just now";
};

const GithubDiagnostics: React.FC = () => {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
                if (cachedData && cacheTime && (Date.now() - parseInt(cacheTime, 10) < CACHE_DURATION)) {
                    setData({ ...JSON.parse(cachedData), isCached: true });
                    setLoading(false);
                    return;
                }

                const [userRes, contribRes, eventsRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${USERNAME}`),
                    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`),
                    fetch(`https://api.github.com/users/${USERNAME}/events/public`)
                ]);

                if (!userRes.ok || !contribRes.ok || !eventsRes.ok) throw new Error('API Error');

                const userData = await userRes.json();
                const contribData = await contribRes.json();
                const eventsData = await eventsRes.json();

                // Contributions parsing
                const year = new Date().getFullYear();
                let totalContributions = contribData.total?.[year] || contribData.total?.lastYear || 0;
                let pStreak = 0, currentStreak = 0, longestStreak = 0;
                if (contribData.contributions) {
                    const todayStr = new Date().toISOString().split('T')[0];
                    let foundToday = false;
                    for (let i = contribData.contributions.length - 1; i >= 0; i--) {
                        const day = contribData.contributions[i];
                        if (!foundToday && day.date > todayStr) continue;
                        if (!foundToday && day.date <= todayStr) foundToday = true;
                        if (day.count > 0) {
                            pStreak++;
                            longestStreak = Math.max(longestStreak, pStreak);
                            if (pStreak === currentStreak + 1) currentStreak = pStreak;
                        } else if (foundToday) {
                            pStreak = 0;
                        }
                    }
                }

                const pushEvents: PushEvent[] = eventsData
                    .filter((e: any) => e.type === 'PushEvent')
                    .slice(0, 5)
                    .map((e: any) => {
                        const repoParts = e.repo.name.split('/');
                        const repoName = repoParts.length > 1 ? repoParts[1] : e.repo.name;
                        return {
                            repo: repoName,
                            commits: e.payload.commits?.length || 0,
                            timeStr: timeSince(e.created_at)
                        };
                    });

                const calculatedData: Omit<GitHubData, 'isCached'> = {
                    repos: userData.public_repos,
                    totalContributions,
                    currentStreak,
                    longestStreak,
                    events: pushEvents
                };

                localStorage.setItem(CACHE_KEY, JSON.stringify(calculatedData));
                localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());

                setData({ ...calculatedData, isCached: false });
                setLoading(false);

            } catch (err) {
                console.error(err);
                setError(true);
                setLoading(false);
            }
        };
        fetchGithubData();
    }, []);

    if (loading) {
        return (
            <div className="gh-container scanning">
                <div className="gh-log">[SYSTEM] Connecting to GitHub Data Matrix...</div>
                <div className="gh-log">[SYSTEM] Initializing telemetry streams...</div>
                <div className="gh-loader"></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="gh-container error-state">
                <div className="gh-error-msg mono">System metrics temporarily unavailable.</div>
            </div>
        );
    }

    return (
        <div className="gh-dashboard ready">
            {/* RINGS */}
            <div className="gh-rings-grid">
                <ProgressRing value={data.currentStreak} max={30} label="Current Streak" />
                <ProgressRing value={data.longestStreak} max={100} label="Longest Streak" />
                <ProgressRing value={data.totalContributions} max={1000} label="Contributions" />
            </div>

            {/* PULSE GRAPH */}
            <PulseGraph />

            {/* FEED */}
            <div className="gh-feed-container">
                {data.events.map((ev, i) => (
                    <div key={i} className="gh-feed-item mono" style={{ animationDelay: `${i * 0.15}s` }}>
                        <span className="feed-bracket">[</span><span className="feed-repo">{ev.repo}</span><span className="feed-bracket">]</span>
                        <span className="feed-dash"> — </span>
                        <span className="feed-action">pushed {ev.commits} commit{ev.commits !== 1 ? 's' : ''}</span>
                        <span className="feed-dash hide-mobile"> — </span>
                        <span className="feed-time">{ev.timeStr}</span>
                    </div>
                ))}
                {data.events.length === 0 && (
                    <div className="gh-feed-item mono" style={{ color: 'var(--text-muted)' }}>No recent push events detected.</div>
                )}
            </div>

            {/* LOWER PANEL */}
            <div className="gh-lower-panel mono">
                <div className="panel-stat">
                    <span className="panel-label">REPOSITORIES:</span>
                    <span className="panel-value"><AnimatedNumber value={data.repos} /></span>
                </div>
                <div className="panel-stat">
                    <span className="panel-label">YEARLY CONTRIB:</span>
                    <span className="panel-value"><AnimatedNumber value={data.totalContributions} /></span>
                </div>
                <div className="panel-stat">
                    <span className="panel-label">API STATUS:</span>
                    <span className="panel-value status-flex">
                        <span className={`status-dot ${data.isCached ? 'cached' : 'online'}`}></span>
                        {data.isCached ? 'CACHED' : 'ONLINE'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GithubDiagnostics;
