import axios from "axios";
const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardContainer = document.createElement('div')
  cardContainer.classList.add('card')
  
  const headlineDiv = document.createElement('div')
  headlineDiv.classList.add('headline')
  headlineDiv.textContent = article.headline

  const autorDiv = document.createElement('div')
  autorDiv.classList.add('author')

  const imgContainer = document.createElement('div')
  imgContainer.classList.add('img-container')
  const authorPhotoImg = document.createElement('img');
  authorPhotoImg.src = article.authorPhoto;

  imgContainer.appendChild(authorPhotoImg)

  const autorName = document.createElement('span')
  autorName.textContent = `By ${article.authorName}`

  autorDiv.appendChild(imgContainer)
  autorDiv.appendChild(autorName)  

  cardContainer.appendChild(headlineDiv)
  cardContainer.appendChild(autorDiv)

  cardContainer.addEventListener('click', ()=>{
    console.log(article.headline);
  })
  return cardContainer
}


  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  

  const cardAppender = async (selector) => {
    try {
      const response = await axios.get('http://localhost:5001/api/articles');
      const articlesData = response.data.articles;
      console.log('Articles Data:', articlesData);

      if (!articlesData) return; 
  
      const articles = Object.values(articlesData); 
      console.log('Articles:', articles);

      const elementToAppend = document.querySelector(selector);
      if (elementToAppend) {
        articles.forEach((articleGroup) => {
          articleGroup.forEach((article) => {
            const card = Card(article);
            elementToAppend.appendChild(card);
          });
        });
      } else {
        console.error('DOM element with the provided selector not found.');
      }
    } catch (error) {
      console.error('Error fetching or processing articles data:', error);
    }
  }

export { Card, cardAppender }
