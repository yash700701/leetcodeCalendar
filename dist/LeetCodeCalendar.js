import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const defaultTheme = {
    background: '#ffffff',
    text: '#000000',
    level0: '#c1c1c1ff',
    level1: '#c6e48b',
    level2: '#7bc96f',
    level3: '#239a3b',
    level4: '#196127',
};
const LeetCodeCalendar = ({ username, blockSize = 15, blockMargin = 5, fontSize = 14, theme = defaultTheme, style = {}, }) => {
    const [data, setData] = useState({});
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
            const response = await fetch('https://leetcodecalendar.onrender.com/leetcode', {
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
            const mapped = {};
            for (const timestamp in parsed) {
                const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
                mapped[date] = parsed[timestamp];
            }
            setData(mapped);
        }
        catch (err) {
            console.error('Failed to fetch:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const getColor = (count) => {
        if (count === 0)
            return theme.level0;
        if (count < 2)
            return theme.level1;
        if (count < 5)
            return theme.level2;
        if (count < 10)
            return theme.level3;
        return theme.level4;
    };
    const generateGrid = () => {
        const today = new Date();
        const days = Array.from({ length: 7 }, () => []);
        // go back 365 days from today
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const iso = date.toISOString().split('T')[0];
            const count = data[iso] || 0;
            const color = getColor(count);
            totalSubmissions += count;
            const dayIndex = date.getDay();
            days[dayIndex].unshift(_jsx("div", { title: `${iso}: ${count} submission${count !== 1 ? 's' : ''}`, style: {
                    width: blockSize,
                    height: blockSize,
                    margin: blockMargin / 2,
                    backgroundColor: color,
                    borderRadius: 2,
                } }, iso));
        }
        return days.map((week, idx) => (_jsx("div", { style: { display: 'flex', flexDirection: 'row' }, children: week }, idx)));
    };
    useEffect(() => {
        fetchCalendar();
    }, [username]);
    if (loading)
        return _jsx("div", { style: { fontSize }, children: "Loading..." });
    return (_jsxs("div", { style: {
            color: theme.text,
            padding: 10,
            fontFamily: 'sans-serif',
            fontSize,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            ...style,
            width: '100%',
        }, children: [_jsxs("div", { style: { marginBottom: 10 }, children: [username, "'s LeetCode Activity"] }), _jsx("div", { children: _jsxs("div", { style: { display: 'flex', flexDirection: 'column', background: theme.background, padding: '7px' }, children: [_jsx("div", { style: { overflowX: 'auto', whiteSpace: 'nowrap', width: '100%' }, children: generateGrid() }), _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, fontSize: 12, color: theme.text }, children: [_jsx("div", { children: `Total submissions in one year: ${totalSubmissions}` }), _jsxs("div", { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }, children: [_jsx("p", { style: { margin: 0 }, children: "Less" }), _jsx("div", { style: { width: '12px', height: '12px', backgroundColor: theme.level0, borderRadius: 2 } }), _jsx("div", { style: { width: '12px', height: '12px', backgroundColor: theme.level1, borderRadius: 2 } }), _jsx("div", { style: { width: '12px', height: '12px', backgroundColor: theme.level2, borderRadius: 2 } }), _jsx("div", { style: { width: '12px', height: '12px', backgroundColor: theme.level3, borderRadius: 2 } }), _jsx("div", { style: { width: '12px', height: '12px', backgroundColor: theme.level4, borderRadius: 2 } }), _jsx("p", { style: { margin: 0 }, children: "More" })] })] })] }) })] }));
};
export default LeetCodeCalendar;
