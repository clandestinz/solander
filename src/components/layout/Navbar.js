import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Avatar from '@material-ui/core/Avatar'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import List from '@material-ui/core/List'
import Container from '@material-ui/core/Container'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import ExploreIcon from '@material-ui/icons/Explore'
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import AddLocationIcon from '@material-ui/icons/AddLocation';


import firebase from 'firebase/app'
import 'firebase/auth'

const useStyles = makeStyles((theme)=>({
	root: {
		top: 'auto',
		bottom: 0,
		borderRadius: '1rem 1rem 0 0',
		overflow: 'hidden',
	},
	nav: {
		backgroundColor: 'transparent',
	},
	avatar: {
		width: '24px',
		height: '24px',
	},
	drawer: {
		borderRadius: '1rem 1rem 0 0',
		maxWidth: theme.breakpoints.width('sm'),
		marginLeft: 'auto',
		marginRight: 'auto',
	}
}))

export default function Navbar(props) {
	const style = useStyles()
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const pathname = window.location.pathname
	const [currentPage, setCurrentPage] = React.useState(pathname)
	const [themeMenu, setThemeMenu] = React.useState(false)
	const [loginMenu, setLoginMenu] = React.useState(false)
	const history = useHistory()


	return(
		<>
		<AppBar color='default' position='fixed' className={style.root}>
			<Container maxWidth='sm'>
				<BottomNavigation showLabels className={style.nav} value={currentPage}
					onChange={(event, newValue) => {if(newValue !== 'noSwitch') setCurrentPage(newValue)}}>
					<BottomNavigationAction
						onClick={()=>history.push('/')}
						value='/'
						label='Hartă'
						icon={<ExploreIcon/>}/>
					<BottomNavigationAction
						onClick={()=>history.push('/info')}
						value='/info'
						label='Info' 
						icon={<LiveHelpIcon/>}/>
					<BottomNavigationAction
						onClick={()=>{setLoginMenu(true)}}
						value='noSwitch'
						label='Cont'
						icon={props.auth ? <Avatar className={style.avatar} src={props.auth.photoURL} referrerPolicy="no-referrer"/> : <AccountCircleRoundedIcon/>}/>
					<BottomNavigationAction
						onClick={()=>history.push('/add')}
						value='/add'
						label='Adaugă'
						icon={<AddLocationIcon/>}/>
					<BottomNavigationAction
						onClick={()=>{setThemeMenu(true)}}
						value='noSwitch'
						label='Temă'
						icon={<Brightness4RoundedIcon/>}/>
					</BottomNavigation>
				</Container>
			</AppBar>

			<SwipeableDrawer
				open={loginMenu}
				onClose={()=>setLoginMenu(false)}
				onOpen={()=>setLoginMenu(true)}
				classes={{paper: style.drawer}}
				anchor='bottom'
				disableSwipeToOpen={true}
				>
				<List> 
					<ListItem>
						<ListItemText secondary='Cont'/>
					</ListItem>
					<Divider/>
					{!props.auth && (
						<>
							<ListItem button onClick={()=>{
							var googleAuthProvider = new firebase.auth.GoogleAuthProvider();

							firebase.auth().signInWithPopup(googleAuthProvider)
								.catch(err => {
									console.log(err)
								}).then(()=>setLoginMenu(false))
							}}>
								<ListItemAvatar>
									<Avatar className={style.avatar} src={require('../assets/auth-providers/google.png')}/>
								</ListItemAvatar>
								<ListItemText primary='Sign in with Google'/>
							</ListItem>
							<ListItem button onClick={()=>{
								var facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

								firebase.auth().signInWithPopup(facebookAuthProvider)
									.catch(err => {
										console.log(err)
									}).then(()=>setLoginMenu(false))
							}}>
								<ListItemAvatar>
									<Avatar className={style.avatar} src={require('../assets/auth-providers/facebook.png')}/>
								</ListItemAvatar>
								<ListItemText primary='Sign in with Facebook'/>
							</ListItem>
						</>
					)}
					{props.auth && (
						<>
							<ListItem button>
								<ListItemAvatar>
									<Avatar src={props.auth.photoURL} referrerPolicy="no-referrer"/>
								</ListItemAvatar>
								<ListItemText primary={props.auth.displayName} secondary='Utilizator actual'/>
								<ListItemSecondaryAction>
									<IconButton onClick={()=>{
										firebase.auth().signOut()
										setLoginMenu(false)
										}}>
										<ExitToAppIcon color='error'/>
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						</>
					)}
				</List>
			</SwipeableDrawer>
			<SwipeableDrawer
				classes={{paper: style.drawer}}
				onClose={()=>setThemeMenu(false)}
				onOpen={()=>setThemeMenu(true)}
				open={themeMenu}
				anchor='bottom'
				disableSwipeToOpen={true}
				>
				<List>
					<ListItem>
						<ListItemText secondary='Temă'/>
					</ListItem>
					<Divider/>
					<ListItem button onClick={()=>{
						props.setAppTheme('light')
						window.localStorage.setItem('theme', 'light')
						setThemeMenu(false)
					}}>
						<ListItemIcon>
							<Brightness1Icon/>
						</ListItemIcon>
						<ListItemText primary='Luminos' secondary='Light side of the Force'/>
					</ListItem>
					<ListItem button onClick={()=>{
						props.setAppTheme('dark')
						window.localStorage.setItem('theme', 'dark')
						setThemeMenu(false)
					}}>
						<ListItemIcon>
							<Brightness3Icon/>
						</ListItemIcon>
						<ListItemText primary='Dracula' secondary='Pentru voi, vampirilor'/>
					</ListItem>
					<ListItem button onClick={()=>{
						props.setAppTheme(prefersDarkMode ? 'dark' : 'light')
						window.localStorage.setItem('theme', prefersDarkMode ? 'dark' : 'light')
						setThemeMenu(false)
					}}>
						<ListItemIcon>
							<BrightnessAutoIcon/>
						</ListItemIcon>
						<ListItemText primary='Auto' secondary='Cum vrea dispozitivul tau'/>
					</ListItem>
					</List>
			</SwipeableDrawer>
		</>
	)
}