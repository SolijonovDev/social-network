import React from 'react';
import List from '@material-ui/core/List';
import MUser from './MUser';
import { usersStyle } from './UsersStyle';
import { useSelector } from 'react-redux';
import Item from './Loading/Item';

const arr = new Array(8).fill(1);
export default function MUsers() {
  const classes = usersStyle();
  const { chats, isLoading } = useSelector(state => state.user)
  return (
    <>
      {isLoading ?
        arr.map((s, index) => (
          <Item key={index} />
        )
        )
        :
        <List className={classes.root}>
          {chats.map((item) => (
            <li key={item.title} className={classes.listSection}>
              <MUser user={item} />
            </li>
          ))}
        </List>
        }
    </>
  );
}