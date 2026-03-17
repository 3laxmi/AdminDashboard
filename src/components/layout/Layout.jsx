// import React from 'react'
// import Sidebar from './Sidebar'
// import Header from './Header'
// import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { useEffect } from 'react'

// const Layout = () => {
//     const mode = useSelector((state)=> state.theme.mode);
//     console.log("theme mode:", mode);

//      useEffect(() => {
//     if(mode === "dark"){
//       document.documentElement.classList.add("dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//     }
//   }, [mode])
//     return (
//         <div style={{background: mode === "dark" ? "black" : "white"}}>
//         <div className={mode === "dark" ? "dark" : ""}>
//         <div   className="bg-gray-100 dark:bg-gray-900 min-h-screen">
//             <Header />
            
//             <div className="flex">
//                 <Sidebar />
                
//                 <main className="flex-1 ml-64 p-6 text-gray-900 min-h-screen">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//         </div>
//         </div>
//     )
// }

// export default Layout



import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Layout = () => {

  const mode = useSelector((state)=> state.theme.mode);
  console.log("theme mode:", mode);

  useEffect(() => {
    if(mode === "dark"){
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [mode])

  return (

    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">

      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 ml-64 p-6 text-gray-900 dark:text-white">
          <Outlet />
        </main>
      </div>

    </div>
    
  )
}

export default Layout