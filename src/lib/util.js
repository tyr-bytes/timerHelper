/**
 * @param {number} x
 */
export function human_readable_from_seconds(x) {
    if (x === 0 || x === undefined || x === null) {
        return "no time";
    }

    x = Math.round(x); // Round to nearest second
    let h = Math.floor(x / 3600),
        m = Math.floor((x % 3600) / 60),
        s = x % 60;
    let parts = [];

    if (h > 0) parts.push(`${h} ${h === 1 ? 'hour' : 'hours'}`);
    if (m > 0) parts.push(`${m} ${m === 1 ? 'minute' : 'minutes'}`);
    if (s > 0 || parts.length === 0) parts.push(`${s} ${s === 1 ? 'second' : 'seconds'}`);

    // Special case for durations less than a minute
    if (h === 0 && m === 0) {
        return parts[0];
    }

    // General case
    if (parts.length > 1) {
        return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
    } else {
        return parts[0];
    }
}