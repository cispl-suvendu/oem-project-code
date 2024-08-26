'use client'

import { isObject } from '@/src/helper/isObject';
import { filterData } from '@/src/helper/uniqueData';
import { useEffect, useState } from 'react'

export default function useTest({data, open=false}) {
    const [test, setTest] = useState([]);
    const [on, setOnn] = useState(open);

useEffect(()=>{
    if(isObject(data)) {
        if(data.category.length){
          const processdData = filterData(data.category);
          return setTest([...processdData]);
        }
      };
     return Array.isArray(data) ? setTest([...data]) : setTest([]);
},[data]);

  return {
    test, setTest, open:on, setOpen: setOnn
  }
}
