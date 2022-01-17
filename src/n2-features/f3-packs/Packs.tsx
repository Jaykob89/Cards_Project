import s from "./Packs.module.scss";
import Subtitle from "../../n1-main/m1-ui/common/Pvl/subtitle/Subtitle.jsx";
import Button from "../../n1-main/m1-ui/common/Pvl/button/Button";
import Table from "../../n1-main/m1-ui/components/table/Table";
import UseSlider from "../../n1-main/m1-ui/common/Pvl/slider/UseSlider.jsx";
import BottomBlock from "../../n1-main/m1-ui/common/Pvl/bottom-block/BottomBlock";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {useEffect} from "react";
import {getPacksTC, getUserIdAC} from "../../n1-main/m2-bll/packsReducer";
import {AppStoreType} from "../../n1-main/m2-bll/store";
import {setSortPacksAC, SortPackType} from "../../n1-main/m2-bll/findAndPaginationReducer";
import {showModalAddCardsPackAC} from "../../n1-main/m2-bll/modalReducer";
import ModalAddPack from "../f5-modal/ModalAddPack/ModalAddPack";
import {
    SearchCardsPacksContainer
} from "../f2-table/Search/SearchCardsPacksContainer/SearchCardsPacksContainer";
import {TableDataType, TableStyleType} from "../../types/types";
import {RequestStatusType} from "../../n1-main/m2-bll/appReducer";
import ProfileBlock from "../../n1-main/m1-ui/common/Pvl/profile-block/ProfileBlock";

import img from "./../../assets/img/photo-profile.png";

// стилизация синей кнопки
const buttonStyle = {
    width: "184px",
    marginLeft: "24px"
}
// стилизация ширины столбцов таблицы
const tableStyle: TableStyleType = {
    th1: {
        width: "185px",
    },
    th2: {
        width: "80px",
    },
    th3: {
        width: "180px",
    },
    th4: {
        width: "112px",
    },
    th5: {
        width: "160px",
    }
}

// данные для ProfileBlock
const profileData = {
   name: "Petr Ivanov",
   img: img
}

export default function PacksList() {
    // данные для таблицы
    const tableData: TableDataType = {
        title1: {
            value: "Name",
            upperSortHandler: () => {
                dispatch(setSortPacksAC('0name'))
            },
            lowerSortHandler: () => {
                dispatch(setSortPacksAC('1name'))
            },
        },
        title2: {
            value: "Cards",
            upperSortHandler: () => {
                dispatch(setSortPacksAC('0cardsCount'))
            },
            lowerSortHandler: () => {
                dispatch(setSortPacksAC('1cardsCount'))
            },
        },
        title3: {
            value: "Last Updated",
            upperSortHandler: () => {
                dispatch(setSortPacksAC('0updated'))
            },
            lowerSortHandler: () => {
                dispatch(setSortPacksAC('1updated'))
            },
        },
        title4: {
            value: "Created by",
            upperSortHandler: () => {
                dispatch(setSortPacksAC('0user_name'))
            },
            lowerSortHandler: () => {
                dispatch(setSortPacksAC('1user_name'))
            },
        },
        title5: "Actions",

    }

    const pageCount = useSelector<AppStoreType, number>(state => state.findAndPagination.cardPacks.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.findAndPagination.cardPacks.page)
    const sortPacks = useSelector<AppStoreType, SortPackType>(state => state.findAndPagination.cardPacks.sortPacks)
    const user_id = useSelector<AppStoreType, string>(state => state.profile._id)
    const current_id = useSelector<AppStoreType, string>(state => state.packs.packUser_id)
    const appStatus = useSelector<AppStoreType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, pageCount, page, sortPacks])

    const addPacksHandler = () => {
        dispatch(showModalAddCardsPackAC())
    }

    const onMyHandler = () => {
        dispatch(getUserIdAC(user_id))
        dispatch(getPacksTC())
    }
    const onAllHandler = () => {
        dispatch(getUserIdAC(''))
        dispatch(getPacksTC())
    }

    return (
        <>
            <ModalAddPack/>
            <div className={s.packsList}>
                <aside className={s.sidebar}>
                   <div className={s.profileBlock}>
                     <ProfileBlock data={profileData} />
                   </div>                   
                    <span className={s.label}>Show packs cards</span>
                    <div className={s.btnBlock}>
                        <button onClick={onMyHandler}
                                className={`${s.btn} ${current_id === user_id ? s.active : ''}`}>My
                        </button>
                        <button onClick={onAllHandler} className={`${s.btn} ${!current_id ? s.active : ''}`}>All
                        </button>
                    </div>
                    <UseSlider/>
                </aside>
                <main className={s.main}>
                    <div className={s.title}>
                        <Subtitle subtitle="Packs list"/>
                    </div>
                    <div className={s.searchBlock}>
                        <div className={s.search}>
                            <SearchCardsPacksContainer/>
                        </div>
                        <Button onClick={addPacksHandler} label="Add new pack" style={buttonStyle}
                                disabled={appStatus === "loading"}/>
                    </div>
                    <Table tableData={tableData} style={tableStyle}/>
                    <BottomBlock type={"packs"}/>
                </main>
            </div>
        </>
    );
}

export type profileDataType = {
    name: string
    img: string
}