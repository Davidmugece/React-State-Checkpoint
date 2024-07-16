import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Person: {
        fullName: 'Kim John',
        bio: 'A passionate web developer.',
        imgSrc: 'https://images.theconversation.com/files/161848/original/image-20170321-5391-lhfxgo.jpg?ixlib=rb-4.1.0&rect=0%2C613%2C5616%2C2723&q=45&auto=format&w=1356&h=668&fit=crop',
        profession: 'Software Engineer'
      },
      shows: false,
      startTime: new Date(),
      elapsedTime: '0 seconds'
    };
    this.timer = null; // Reference for the interval timer
  }

  componentDidMount() {
    // Set up the interval timer to update elapsed time every second
    this.timer = setInterval(() => {
      this.updateElapsedTime();
    }, 1000);
  }

  componentWillUnmount() {
    // Clear the interval timer when the component is unmounted
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateElapsedTime = () => {
    const currentTime = new Date();
    const timeDiff = Math.floor((currentTime - this.state.startTime) / 1000); // Calculate time difference in seconds
    this.setState({
      elapsedTime: `${timeDiff} seconds`
    });
  };

  // Toggle the shows state
  toggleShow = () => {
    this.setState(prevState => ({
      shows: !prevState.shows
    }));
  };

  render() {
    const { fullName, bio, imgSrc, profession } = this.state.Person;
    const { shows, elapsedTime } = this.state; // Ensure `elapsedTime` is destructured here

    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={this.toggleShow}
          style={{ marginBottom: '20px', padding: '10px 20px', fontSize: '16px' }}
        >
          {shows ? 'Hide' : 'Show'} Profile
        </button>
        {shows && (
          <div className="profile" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', display: 'inline-block', textAlign: 'left' }}>
            <img src={imgSrc} alt={fullName} style={{ width: '150px', borderRadius: '50%', display: 'block', margin: '0 auto' }} />
            <h1>{fullName}</h1>
            <p>{bio}</p>
            <p>{profession}</p>
          </div>
        )}

        <p style={{ marginTop: '20px', fontSize: '18px' }}>
          Time since mounted: {elapsedTime}
        </p>
      </div>
    );
  }
}

export default App;
