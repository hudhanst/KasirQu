import React, { Fragment } from 'react'

import { connect } from 'react-redux'

import { Load_Account_List, get_AccountId_Detail, get_AccountId_Update, Delete_an_Account } from '../../../Store/Actions/Account.Actions'

import { Short_Column_INT, Short_Column_STR } from '../Shorting'

import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@material-ui/core'

import { MUI_FullWidth, MUI_VerticalMargin } from '../../../MUI_theme'

import { DataTidakDitemukan } from '../Page404'
import GenericModals from '../GenericModals'
import AccountDetail from './Account.AccountDetail'
import AccountUpdate from './Account.AccountUpdate'

class UserDataList extends React.Component {
    componentDidMount() {
        this.props.Load_Account_List()
    }
    ButtonShortSTR(ColumnNumb) {
        Short_Column_STR('tabel_user', ColumnNumb)
    }
    ButtonShortINT(ColumnNumb) {
        Short_Column_INT('tabel_user', ColumnNumb)
    }
    onClick_get_AccountId_Detail(AccountID) {
        this.props.get_AccountId_Detail(AccountID)
    }
    onClick_get_AccountId_Update(AccountID) {
        this.props.get_AccountId_Update(AccountID)
    }
    onClick_get_Delete_an_Account(AccountID) {
        const { User } = this.props
        const authdata = {
            isKasir: User.isKasir,
            isAdmin: User.isAdmin,
            isSuperUser: User.isSuperUser,
        }
        this.props.Delete_an_Account(AccountID, authdata)
    }
    render() {
        const data = this.props.AccountList
        const { User, idDetailAccount } = this.props
        const DeleteButton = () => {
            return (
                <Fragment>
                    <Button
                        style={{ ...MUI_FullWidth, MUI_VerticalMargin }}
                        variant='contained'
                        color='secondary'
                        onClick={() => this.onClick_get_Delete_an_Account(idDetailAccount)}
                    >
                        Delete
                        </Button>
                </Fragment>
            )
        }
        return (
            <Fragment>
                {data ?
                    <Table id='tabel_user'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '5%' }} align='center' onClick={() => this.ButtonShortINT(0)}>No</TableCell>
                                <TableCell style={{ width: '15%' }} align='left' onClick={() => this.ButtonShortSTR(1)}>ID</TableCell>
                                <TableCell style={{ width: '50%' }} align='left' onClick={() => this.ButtonShortSTR(2)}>User Name</TableCell>
                                <TableCell style={{ width: '10%' }} align='center'>Detail</TableCell>
                                {User ? (User.isSuperUser ?
                                    <Fragment>
                                        <TableCell style={{ width: '10%' }} align='center'>Edit</TableCell>
                                        <TableCell style={{ width: '10%' }} align='center'>Delete</TableCell>
                                    </Fragment>
                                    : null)
                                    : null
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow hover key={index + 1}>
                                    <TableCell align='center'>{index + 1}</TableCell>
                                    <TableCell align='left'>{item._id}</TableCell>
                                    <TableCell align='left'>{item.UserName}</TableCell>
                                    <TableCell align='center'>
                                        <GenericModals
                                            size='s'
                                            header='Account Detail'
                                            body={<AccountDetail />}
                                            Buttoncolor='primary'
                                            ButtononClickeven={() => this.onClick_get_AccountId_Detail(item._id)}
                                            Buttonlabel={'Detail'}
                                        />
                                    </TableCell>
                                    {User ? (User.isSuperUser ?
                                        <Fragment>
                                            <TableCell align='center'>
                                                <GenericModals
                                                    size='m'
                                                    header='Update Account'
                                                    body={<AccountUpdate />}
                                                    Buttoncolor='inherit'
                                                    ButtononClickeven={() => this.onClick_get_AccountId_Update(item._id)}
                                                    Buttonlabel={'Edit'}
                                                />
                                            </TableCell>
                                            <TableCell align='center'>
                                                <GenericModals
                                                    size='s'
                                                    header='Delete Account'
                                                    body={<AccountDetail />}
                                                    footer={<DeleteButton />}
                                                    Buttoncolor='secondary'
                                                    ButtononClickeven={() => this.onClick_get_AccountId_Detail(item._id)}
                                                    Buttonlabel={'Delete'}
                                                />
                                            </TableCell>
                                        </Fragment>
                                        : null)
                                        : null
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    :
                    <DataTidakDitemukan />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    User: state.Auth.User,
    AccountList: state.Account.AccountList,
    idDetailAccount: state.Account.idDetailAccount,
})

export default connect(mapStateToProps, { Load_Account_List, get_AccountId_Detail, get_AccountId_Update, Delete_an_Account })(UserDataList)