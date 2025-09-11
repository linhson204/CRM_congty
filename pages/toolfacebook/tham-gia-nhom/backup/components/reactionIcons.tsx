import stylepu from '../[accountId]/popup/popup.module.css';

export default function ReactionIcons() {
  return (
    <div className={stylepu.reactionIcons}>
      <span className={stylepu.likeIcon}></span>
      <span className={stylepu.favorIcon}></span>
    </div>
  );
}