import React from 'react';
import Item from './Item';
const arr=new Array(8);
export default function LoadingMusers() {
  return <div>
      {
          arr.map(s=>(
              <Item/>
        ))
      }
  </div>;
}
