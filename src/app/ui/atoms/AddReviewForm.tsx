export const AddReviewForm = () => {
   
    return (
      <form data-testid="add-review-form">
        <div>
          <label htmlFor="headline">Headline:</label>
          <input
            type="text"
            id="headline"
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            required
          />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };
  