import React, { useState, Fragment } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

const TabsPills = ({ tabs }) => {
  const [active, setActive] = useState('1')

  const toggle = tab => {
    setActive(tab)
  }
  return (
    <Fragment>
      <Nav pills>
        
        {tabs?.map((value, key) => {
          return (
            <NavItem>
              <NavLink
                active={active === key}
                onClick={() => {
                  toggle(key)
                }}
              >
                {value.title}
              </NavLink>
            </NavItem>
          )
        }
            
          )
        }
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        {tabs?.map((value, key) => 
            <TabPane tabId={key}>
              {value.content}
            </TabPane>
          )
        }
      </TabContent>
    </Fragment>
  )
}

export default TabsPills