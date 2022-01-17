import s from "./ProfileBlock.module.scss";
import TableButton from "../../../components/table/table-button/TableButton";
import {profileDataType} from "../../../../../n2-features/f3-packs/Packs";
import {CSSProperties} from "react";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../m2-bll/store";
import {AuthResponseType} from "../../../../m2-bll/api/api";
import {useNavigate} from "react-router-dom";

export default function ProfileBlock(props: PropsType) {
    const {
        name,
        email,
        avatar
    } = useSelector<AppStoreType, AuthResponseType>(state => state.profile)

   const navigate = useNavigate();

   const onClickHandler = () => {
       navigate(`/profile`, { state: { incomingState: true }  })
   }

   return (
      <div className={s.profileBlock}>
         <img className={s.img} src={avatar} alt="photo" />
         <span className={s.nameLabel}>{name}</span>
         <span className={s.professionLabel}>{email}</span>
         <TableButton style={props.styleButton} label="Edit profile" onClick={onClickHandler}/>
      </div>
   )
}

type PropsType = {
    data: profileDataType
    styleButton?: CSSProperties
}



