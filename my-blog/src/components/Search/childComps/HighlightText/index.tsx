import s from "./index.module.styl";
interface Iprops {
  text: string;
  highlightText?: string;
  className?: string;
}

const HighlightText: React.FC<Iprops> = ({
  text,
  highlightText = "",
  className,
}) => {
  const idx = text.indexOf(highlightText);
  const len = highlightText.length;
  const beforeStr = text.slice(0, idx);
  const afterStr = text.slice(idx + len);
  return (
    <>
      {idx !== -1 ? (
        <span className={className}>
          {beforeStr}
          <span className={s.highLightText}>{highlightText}</span>
          {afterStr}
        </span>
      ) : (
        <span className={className}>{text}</span>
      )}
    </>
  );
};

export default HighlightText;
