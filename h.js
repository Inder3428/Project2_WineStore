document.addEventListener('DOMContentLoaded', () => {
  const ratings = document.querySelectorAll('.rating');
  let selectedRating = 0;

  ratings.forEach(rating => {
    rating.addEventListener('click', () => {
      ratings.forEach(r => r.classList.remove('active'));
      rating.classList.add('active');
      selectedRating = rating.dataset.value;
    });
  });

  const sendButton = document.getElementById('send');
  sendButton.addEventListener('click', () => {
    if (selectedRating > 0) {
      alert(`Thank you for your feedback! You rated us: ${selectedRating}/3`);
      // Here you could also send the data to a server using fetch or XMLHttpRequest
    } else {
      alert('Please select a rating before submitting your feedback.');
    }
  });
});
