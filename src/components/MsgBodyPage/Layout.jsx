import React from 'react'
import { useState } from 'react';
import Header from '../MainPageHeader';
import Sidebar from '../Drawer/DrawerFeature';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MailHeader from './MsgTopHeader';
import RightSideIcon from '../IconBars/RightIconBar';

function Layout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(true);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <>
      <LayoutWrapper >
        <Header toggleDrawer={toggleDrawer} />
        <Main>
          <LeftIconBarWrapper>
            <Sidebar openDrawer={openDrawer} />
          </LeftIconBarWrapper>
          <MainBodyWrapper style={openDrawer ? { marginLeft: 250, paddingLeft: 0 } : { width: "100%" }} >
            <EmailTopBar>
              <MailHeader />
            </EmailTopBar>
            <TabBar>
              <TabBarItems>
                <div className='midlenav'>
                  <InboxIcon />
                  Primary
                </div>
                <div className='midlenav'>
                  <LocalOfferOutlinedIcon />
                  Promotion
                </div>
                <div className='midlenav'>
                  <GroupOutlinedIcon />
                  Social
                </div>
                <div className='midlenav'>
                  <InfoOutlinedIcon />
                  Updates
                </div>
              </TabBarItems>
            </TabBar>
            <MailContainer >
              {children}
            </MailContainer>
          </MainBodyWrapper>
          <RigthSideIconBar>
            <RightSideIcon />
          </RigthSideIconBar>
        </Main>
      </LayoutWrapper>
    </>
  )
}
export default Layout

const LayoutWrapper = styled(Box)({
  display: "grid",
  gridTemplateRows: 'auto auto',
  position: 'fixed',
  width: '100%',
});

const Main = styled(Box)({
  display: "grid",
  gridTemplateColumns: "0% auto 5%",
  width: '100%',
  height: '1500px'
});

const RigthSideIconBar = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: "#f2f5fa"
});

const LeftIconBarWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: 'min-content',
});

const EmailTopBar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  height: '50px',
  marginTop: '60px',
  paddingLeft: 10,
  borderRadius: '20px 20px 0 0',
});

const TabBar = styled(Box)({
  display: 'flex',
  width: '100%',
  height: 50,
});

const TabBarItems = styled('div')({
  display: 'grid',
  gridTemplateColumns: '25% 25% 25% 25%',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',

  "& >*": {
    display: 'flex',
    padding: " 10px 0 10px 0",
    gap: '10px',
  },

  "&>*:hover": {
    backgroundColor: '#f5f5f5',
    borderBottom: '3px solid blue'
  }
});

const MailContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  height: '100%',
  borderRadius: '20px',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  backgroundColor: '#f5f5f5',
  overflowY: 'scroll',
});

const MainBodyWrapper = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  width: 'auto',
});