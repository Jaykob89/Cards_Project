import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../n1-main/m2-bll/store";
import {getPacksTC, packsStateType, addPacksTC} from "../../n1-main/m2-bll/packsReducer";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from "react";
import {NavLink} from "react-router-dom";
import {PaginationPacksContainer} from "../f2-table/Pagination/PaginationPacksContainer";
import {Search} from "../f2-table/Search/SearchMain/Search";
import {SortCardPacks} from "../f2-table/SortCardPacks/SortCardPacks";
import s from './Pack.module.scss'
import {SearchCardsPacksContainer} from "../f2-table/Search/SearchCardsPacksContainer/SearchCardsPacksContainer";

export const Packs = () => {
    const {cardPacks} = useSelector<AppStoreType, packsStateType>(state => state.packs)
    const pack_id = useSelector<AppStoreType, string>(state => state.packs.pack_id)
    const pageCount = useSelector<AppStoreType, number>(state => state.findAndPagination.cardPacks.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.findAndPagination.cardPacks.page)
    const sortPacks = useSelector<AppStoreType, string | null>(state => state.findAndPagination.cardPacks.sortPacks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, pageCount, page, sortPacks])

    // function createData(
    //     name: string,
    //     cardsCount: number,
    //     updated: string,
    // ) {
    //     return {name, cardsCount, updated};
    // }

        const addPacksHandler = ()=>{
        dispatch(addPacksTC())
    }

    return (
        <TableContainer className={s.table} component={Paper}>
            <PaginationPacksContainer/>
            <SearchCardsPacksContainer />
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <div className={s.cell}>Name<SortCardPacks upperSort={'0name'} lowerCount={'1name'}/></div>
                        </TableCell>
                        <TableCell align="center" className={s.cell}>
                            <div className={s.cell}>Cards Count<SortCardPacks upperSort={'0cardsCount'} lowerCount={'1cardsCount'}/></div>
                        </TableCell>
                        <TableCell align="center">
                            <div className={s.cell}>Updated<SortCardPacks upperSort={'0updated'} lowerCount={'1updated'}/></div>
                        </TableCell>
                        <TableCell align="center">url</TableCell>
                        <TableCell align='center'><button onClick={addPacksHandler}>add</button></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cardPacks.map((mp) => (
                        <TableRow
                            key={mp._id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">{mp.name}
                            </TableCell>
                            <TableCell align="center">{mp.cardsCount}</TableCell>
                            <TableCell align="center">{mp.updated}</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align='center'><button>del</button></TableCell>
                            <TableCell align='center'><button>update</button></TableCell>
                            <TableCell align="center"> <NavLink to={`/cards/${mp._id}`}>cards</NavLink></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// todo: cards link is not user friendly. Maybe good idea to do it more visible or "click on card pack show it".
