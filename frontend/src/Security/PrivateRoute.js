import React from 'react'

import {connect} from 'react-redux'

import {Route, Redirect} from 'react-router-dom'

// import Loading from '../Components/Container/Loading'

const PrivateRoute=({component:Component, auth,...rest})=>(
    <Route {...rest} render={props=>{
        if (auth.isUserLoading){
            return <h2>loading...</h2>
            // return <Loading />
        }else if(!auth.isAuth){
            return <Redirect to="/login" />
        }else{
            return <Component {...props} />
        }
    }}/>
)

const mapStateToProps=state=>({
    auth:state.Auth
})

export default connect(mapStateToProps)(PrivateRoute)