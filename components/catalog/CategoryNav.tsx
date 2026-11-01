import { CategoryTabs } from "./CategoryTabs";
import { LetterBar } from "./LetterBar";

export function CategoryNav({ activeHref, activeLetter }: { activeHref?: string; activeLetter?: string }) {
  return (
    <div className="space-y-4">
      <CategoryTabs activeHref={activeHref} />
      <LetterBar active={activeLetter} />
    </div>
  );
}
