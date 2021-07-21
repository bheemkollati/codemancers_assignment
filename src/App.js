
import './App.css';
import Post from './Post'

function App() {
  return (
    <div className="app">
      <div className="app__header">
          
          <div className="app__headerRight">
            <h1>Chat App</h1>
          </div>

      </div>
      <Post username="bheem" caption="react root" imageUrl="https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png" />
      {/* <Post username="bheemkollati" caption="Let's go guys" imageUrl="http://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png" /> */}

    </div>
  );
}

export default App;
