import React, { JSX, useEffect, useState } from 'react';

type Props = {
  username: string;
  borderRadius?: number;
  blockSize?: number;
  blockMargin?: number;
  fontSize?: number;
  theme?: {
    background: string;
    text: string;
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
  };
  style?: React.CSSProperties;
};

const defaultTheme = {
  background: '#ffffff',
  text: '#000000',
  level0: '#c1c1c1ff',
  level1: '#c6e48b',
  level2: '#7bc96f',
  level3: '#239a3b',
  level4: '#196127',
};

const LeetCodeCalendar: React.FC<Props> = ({
  username,
  borderRadius = 2,
  blockSize = 15,
  blockMargin = 5,
  fontSize = 14,
  theme = defaultTheme,
  style = {},
}) => {
  const [data, setData] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  let totalSubmissions = 0;

  const fetchCalendar = async () => {
    const query = `
      query {
        matchedUser(username: "${username}") {
          userCalendar {
            submissionCalendar
          }
        }
      }
    `;

    try {    
      const response = await fetch(`https://leetcodecalendar-622147005340.asia-south2.run.app/leetcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: query,
            variables: { username: username },
        }),
      });

      const result = await response.json();
      console.log(result);
      
      const raw = result?.data?.matchedUser?.userCalendar?.submissionCalendar;
      const parsed = JSON.parse(raw || '{}');
      const mapped: Record<string, number> = {};

      for (const timestamp in parsed) {
        const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
        mapped[date] = parsed[timestamp];
      }

      setData(mapped);
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  };

  const getColor = (count: number): string => {
    if (count === 0) return theme.level0;
    if (count < 2) return theme.level1;
    if (count < 5) return theme.level2;
    if (count < 10) return theme.level3;
    return theme.level4;
  };

  const generateGrid = () => {
    const today = new Date();
    const days: JSX.Element[][] = Array.from({ length: 7 }, () => []);

    // go back 365 days from today
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const iso = date.toISOString().split('T')[0];
      const count = data[iso] || 0;
      const color = getColor(count);
      totalSubmissions += count;

      const dayIndex = date.getDay();
      days[dayIndex].unshift(
        <div
          key={iso}
          title={`${iso}: ${count} submission${count !== 1 ? 's' : ''}`}
          style={{
            width: blockSize,
            height: blockSize,
            margin: blockMargin / 2,
            backgroundColor: color,
            borderRadius,
          }}
        />
      );
    }

    return days.map((week, idx) => (
      <div key={idx} style={{ display: 'flex', flexDirection: 'row' }}>
        {week}
      </div>
    ));
  };

  useEffect(() => {
    fetchCalendar();
  }, [username]);

  if (loading) return <div style={{ fontSize }}>Loading...</div>;

  return (
    <div
      style={{
        color: theme.text,
        fontFamily: 'sans-serif',
        fontSize,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        ...style,
      }}
    >
      <div style={{ marginBottom: 10 }}>{username}'s LeetCode Activity</div>
      <div >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', background: theme.background }}>
                {generateGrid()}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, fontSize: 12, color: theme.text }}>
                <div>{`Total submissions in one year: ${totalSubmissions}`}</div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <p style={{ margin: 0 }}>Less</p>
                        <div style={{ width: '12px', height: '12px', backgroundColor: theme.level0, borderRadius }}></div>
                        <div style={{ width: '12px', height: '12px', backgroundColor: theme.level4, borderRadius }}></div>
                        <div style={{ width: '12px', height: '12px', backgroundColor: theme.level3, borderRadius }}></div>
                        <div style={{ width: '12px', height: '12px', backgroundColor: theme.level2, borderRadius }}></div>
                        <div style={{ width: '12px', height: '12px', backgroundColor: theme.level1, borderRadius }}></div>
                        <p style={{ margin: 0 }}>More</p>
                    </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LeetCodeCalendar;
