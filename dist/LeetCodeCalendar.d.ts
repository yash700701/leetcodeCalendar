import React from 'react';
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
declare const LeetCodeCalendar: React.FC<Props>;
export default LeetCodeCalendar;
