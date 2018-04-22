
export const rotatePics = function(e, direction) {
  e.preventDefault();

  let pics = [...this.state.pics];
  
  if (direction === 'RIGHT') {
    pics.unshift(pics.pop());

  } else if (direction === 'LEFT') {
    pics.push(pics.shift());
  }

  this.setState({pics});
}

export const updateDisplayAmount = function() {
  const displayAmount = Math.floor((window.innerWidth - 90)/250);
  this.setState({displayAmount});
}