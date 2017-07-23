import React from 'react';
import ReactDOM from 'react-dom';
import styles from './commentable_text.css';
import PropTypes from 'prop-types';

function Paragraph({ highlight = null, text, index }) {
  if (highlight) {
    const pre = text.substr(0, highlight.start);
    const mid = text.substr(highlight.start, highlight.end - highlight.start);
    const post = text.slice(highlight.end);
    return <p data-index={index}>{pre}<strong>{mid}</strong>{post}</p>;
  }

  return <p data-index={index}>{text}</p>
}

function clamp(x, min, max) {
  return Math.max(Math.min(x, max), min);
}

function CommentToolbar(props) {
  const { top, left, width, maxWidth, newComment } = props;

  const leftPos = clamp(left + clamp(width, 0, maxWidth) / 2, 0, maxWidth);

  const style = {
    top: `${top}px`,
    left: `${leftPos}px`,
  };

  return (
    <div className={styles.commentToolbar} style={style}>
      <button className={styles.commentButton} onClick={newComment}>Comment</button>
    </div>
  );
}

export default
class CommentableText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    highlightedComment: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { selection: {} };
    this.onMouseUp = this.onMouseUp.bind(this);
    this.newComment = this.newComment.bind(this);
  }

  newComment() {
    const { quote, index, start, end } = this.state.selection;
    
    if (!quote) {
      return;
    }

    this.clearSelection();
    this.props.newComment(quote, index, start, end);
  }

  clearSelection() {
    this.setState({ selection: {} });
  }

  onMouseUp(e) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const start = range.startOffset;
    const end = range.endOffset;

    if (end <= start || range.startContainer != range.endContainer) {
      this.clearSelection();
      return;
    }

    const selectionRect = range.getBoundingClientRect();
    const nodeRect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    const rect = {
      top: selectionRect.top - nodeRect.top,
      left: selectionRect.left - nodeRect.left,
      width: selectionRect.width,
      maxWidth: nodeRect.width,
    };

    const paragraph = selection.focusNode.parentNode;
    const index = Number(paragraph.dataset.index);

    this.setState({
      selection: {
        index,
        start,
        end,
        rect,
        quote: selection.toString()
      }
    });
  }

  render() {
    return (
      <div className={styles.commentableText} onMouseUp={this.onMouseUp}>
        {this.renderText()}
        {this.renderToolbar()}
      </div>
    );
  }

  renderText() {
    const paragraphs = this.props.text.split(/\n+/);
    const highlightedComment = this.props.highlightedComment || {};

    return paragraphs.map((text, i) => {
      return (
        <Paragraph
          key={i}
          text={text}
          index={i}
          highlight={highlightedComment.paragraph === i && highlightedComment}
        />
      );
    });
  }

  renderToolbar() {
    const { selection } = this.state;

    if (!selection.rect) {
      return;
    }

    return (
      <CommentToolbar
        {...selection.rect}
        newComment={this.newComment}
      />
    );
  }
}
