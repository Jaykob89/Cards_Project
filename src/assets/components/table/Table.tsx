import s from "./Table.module.scss";
import TableRow from "./table-row/TableRow";
import HeadCell from "./head-cell/HeadCell.jsx";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {packsStateType} from "../../../n1-main/m2-bll/packsReducer";
import {CardType} from "../../../n1-main/m2-bll/cardsReducer";
import HeadButtonCell from "./head-button-cell/HeadButtonCell";
import React from "react";
import {TableDataType, TableStyleType} from "../packs-list/UsePacksList";


export default function Table(props: PropsType) {
    const {cardPacks} = useSelector<AppStoreType, packsStateType>(state => state.packs)
    const cards = useSelector<AppStoreType, CardType[]>(state => state.cards.cards)
    return (
        <div className={s.tableWrap}>
            <table className={s.table}>
                <thead className={s.thead}>
                <tr className={s.tr}>
                    <HeadCell cellStyle={props.style.th1} cellData={props.tableData.title1}/>
                    <HeadCell cellStyle={props.style.th2} cellData={props.tableData.title2}/>
                    <HeadButtonCell
                        cellStyle={props.style.th3}
                        cellData={props.tableData.title3.value}
                        upCallback={props.tableData.title3.upperSortHandler}
                        downCallback={props.tableData.title3.lowerSortHandler}
                    />
                    <HeadCell cellStyle={props.style.th4} cellData={props.tableData.title4}/>
                    <HeadCell cellStyle={props.style.th5} cellData={props.tableData.title5}/>
                </tr>
                </thead>
                <tbody>
                {cardPacks.map((mp) => <TableRow key={mp._id} cellData={mp}/>)}

                </tbody>
            </table>
        </div>
    );
}

type PropsType = {
    style: TableStyleType
    tableData: TableDataType
}