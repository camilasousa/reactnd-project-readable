import React from 'react';
import PropTypes from 'prop-types';

const CategorySelector = ({ id, categories, selectedValue, onChange, disabled }) => (
  <select id={id} onChange={onChange} value={selectedValue} disabled={disabled}>
    {
      categories && categories.map(cat => (
        <option
          key={cat.path}
          value={cat.path}
        >
          {cat.name}
        </option>
      ))
    }
  </select>
);

CategorySelector.propTypes = {
  id: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

class Form extends React.Component {
  state = { title: '', body: '', author: '', categoryPath: '' };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const { categories, disabled } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={this.state.title}
          disabled={disabled}
          onChange={this.handleChange}
        />
        <label htmlFor="body">
          Body:
        </label>
        <input
          id="body"
          type="text"
          value={this.state.body}
          onChange={this.handleChange}
          disabled={disabled}
        />
        <label htmlFor="author">
          Author:
        </label>
        <input
          id="author"
          type="text"
          value={this.state.author}
          onChange={this.handleChange}
          disabled={disabled}
        />
        <CategorySelector
          id="categoryPath"
          categories={categories}
          selectedValue={this.state.categoryPath}
          onChange={this.handleChange}
          disabled={disabled}
        />
        <input type="submit" value="Submit" disabled={disabled} />
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Form;
