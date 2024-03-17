import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import NotFound from './components/NotFound'
import CourseItemDetails from './components/CourseItemDetails'
import './App.css'

// Replace your code here
const App = () => {
  console.log('kavya')
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/courses/:id" component={CourseItemDetails} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App
