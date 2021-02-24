import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const sounds = [
  {
    key: 'Q',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    key: 'W',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'   
  },
  {
    key: 'E',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'  
  },
  {
    key: 'A',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    key: 'S',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' 
  },
  {
    key: 'D',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'  
  },
  {
    key: 'Z',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    key: 'X',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' 
  },
  {
    key: 'C',
    mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'  
  }  
];

const DrumMachine = (props) =>(
  // key={idx} is the required property when mapping over
  // we need the h1 after display since the querySelector is targetting it
  <div id="drum-machine">
    <div id="display" className="display">
    {sounds.map((sound, idx) => (
      <Pad text={sound.key} key={idx} audio={sound.mp3}/>
    ))}
       <h1> </h1>
    </div>
    </div>
  );
class Pad extends React.Component{
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    
  }
  componentDidMount(){
    // This sets the timeout
    this.myRef.current.addEventListener('ended', (e)=> {
      const parent = e.target.parentNode;
      parent.classList.remove('active');
    });
  }
playSound = () =>{
  // console.log(this.myRef.current);
  this.myRef.current.play();
  const id = this.myRef.current.id;
    const parent = this.myRef.current.parentNode;
  parent.classList.add('active');
  // we use parent.parentNode because our current const parent is the className="drum-pad, which will be inside the display"
  const display = parent.parentNode;
  display.querySelector('h1').innerText = id;
}
  render(){
      const {text, audio} = this.props;
    return(
  <div className="drum-pad" onClick={this.playSound} id={`drum-${text}`}>
      {text}
        <audio ref={this.myRef} src={audio} className="clip" id={text} />
    </div>
    );
  }
}

document.addEventListener('keydown', (e) => {
  const id = e.key.toUpperCase(); //have the toUpperCase() so it doesn't crash
  const audio = document.getElementById(id);
  
  if(audio){
  const parent = audio.parentNode;
  parent.classList.add('active');
    audio.play();
      
  }
});

ReactDOM.render(<DrumMachine />, document.getElementById('root'));
