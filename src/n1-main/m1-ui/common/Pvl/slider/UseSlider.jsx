import s from "./UseSlider.Module.scss";
import MySlider from "./MySlider.tsx";

export default function UseSlider () {
   return (
      <div className={s.useSlider}>
         <span className={s.label}>Number of cards</span>
         <MySlider />
      </div>
   )
}

