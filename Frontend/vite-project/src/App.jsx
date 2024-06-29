import { useState ,useEffect} from 'react'
import './App.css'
import ReactDOM from 'react-dom/client'
import { Route,RouterProvider,Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Listing from './Pages/Listing'
import Showlisting from './Pages/Showlisting'
import NewListingForm from './Pages/NewListingForm'
import EditListForm from './components/EditListForm'
import Root from './main'
import Error from './Pages/Error'


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/Listings' element={<Listing/>}/>
          <Route path='/Listings/:id' element={<Showlisting/>}/>
          <Route path='/Listings/new' element={<NewListingForm/>}/>
          <Route path='/Listings/:id/edit' element={<EditListForm/>}/>
          <Route path='/*' element={<Error/>}/>
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
