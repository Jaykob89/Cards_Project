import s from "./ProfileBlock.module.scss";
import TableButton from "../../../components/table/table-button/TableButton.tsx";

import img from "../../../../../assets/img/photo-profile.png";


export default function ProfileBlock(props) {
   return (
      <div className={s.profileBlock}>
         <img className={s.img} src={img} alt="photo" />
         <span className={s.nameLabel}>{props.data.name}</span>
         <span className={s.professionLabel}>Front-end developer</span>
         <TableButton style={props.styleButton} label="Edit profile" />
      </div>
   )
}

