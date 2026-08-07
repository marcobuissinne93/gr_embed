/**
 * SVG <text> has no wrapping, so labels that must break across lines are
 * wrapped here on word boundaries and rendered as successive <text> rows.
 *
 * `maxChars` is an approximation tuned per diagram — the labels are short and
 * the font metrics are stable, so a character budget is enough and avoids
 * measuring text at runtime.
 */
export default function wrapText(text, maxChars, maxLines = Infinity) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = `${kept[maxLines - 1].replace(/[.,;:]$/, '')}…`;
    return kept;
  }
  return lines;
}
