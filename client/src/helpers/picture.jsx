
export const rotatePics = function(direction) {
  const pics = [...this.state.pics];
  if (direction === 'right') {
    pics.unshift(pics.pop());
  } else {
    pics.push(pics.shift());
  }
  this.setState({pics});
}

export const updateDisplayAmount = function() {
  const displayAmount = Math.floor((window.innerWidth - 90)/250);
  this.setState({displayAmount});
}