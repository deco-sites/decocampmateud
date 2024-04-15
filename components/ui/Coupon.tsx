import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  title: string;
  description?: string;
}

const copy = (id: string, title: string) => {
  const btn = document.querySelector(`#${id} button`);
  if (btn) {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(title).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copiado";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 3000);
      });
    });
  }
};

export default function Coupon({ title, description }: Props) {
  const id = useId();
  return (
    <div id={id} class="card w-96 bg-secondary shadow-xl mx-auto rounded-xl">
      <div class="card-body">
        <p class="card-title">Use o cupom: {title}</p>
        {description && <p>{description}</p>}
        <div class="card-actions justify-end">
          <button class="btn btn-primary rounded-xl">
            Copiar cupom
          </button>
        </div>
      </div>
      <script defer src={scriptAsDataURI(copy, id, title)} />
    </div>
  );
}
