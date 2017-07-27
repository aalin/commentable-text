import React from 'react';
import ReactDOM from 'react-dom';
import styles from './commentable_text.css';
import PropTypes from 'prop-types';

const MIN_SELECTED_RANGE = 3;

function getPreCaretOffset(range, paragraph) {
  // https://stackoverflow.com/a/12500791/1375004
  var selected = range.toString().length;
  var preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(paragraph);
  preCaretRange.setEnd(range.endContainer, range.endOffset);

  if (selected){
    return preCaretRange.toString().length - selected;
  } else {
    return preCaretRange.toString().length;
  }
}

function Paragraph({ highlight = null, text = '', index }) {
  if (highlight) {
    const { quote } = highlight;

    const pre = text.substr(0, quote.start);
    const mid = text.substr(quote.start, quote.end - quote.start);
    const post = text.slice(quote.end);

    return (
      <p data-index={index}>
        {pre}
        <span className={styles.highlight}>{mid}</span>
        {post}
      </p>
    );
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

function findElement(element, nodeName) {
  if (element.nodeName === nodeName) {
    return element;
  }

  if (element.parentNode) {
    return findElement(element.parentNode, nodeName);
  }

  return null;
}

export default
class CommentableText extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    highlightedComment: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { selection: null };
    this.onMouseUp = this.onMouseUp.bind(this);
    this.newComment = this.newComment.bind(this);
  }

  newComment() {
    const { selection } = this.state;

    if (!selection) {
      return;
    }

    const { paragraph, start, end, text } = selection;

    this.clearSelection();
    this.props.newComment({ paragraph, start, end, text });
  }

  clearSelection() {
    this.setState({ selection: null });
  }

  onMouseUp(e) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const text = range.toString();

    if (text.length < MIN_SELECTED_LENGTH) {
      this.clearSelection();
      return;
    }

    const commonAncestor = range.commonAncestorContainer;
    const paragraph = findElement(commonAncestor, 'P');

    if (!paragraph) {
      this.clearSelection();
      return;
    }

    const start = getPreCaretOffset(range, paragraph);
    const end = start + text.length;

    const selectionRect = range.getBoundingClientRect();
    const nodeRect = ReactDOM.findDOMNode(this).getBoundingClientRect();

    const rect = {
      top: selectionRect.top - nodeRect.top,
      left: selectionRect.left - nodeRect.left,
      width: selectionRect.width,
      maxWidth: nodeRect.width,
    };

    const index = Number(paragraph.dataset.index);

    this.setState({
      selection: {
        paragraph: index,
        start,
        end,
        text,
        rect,
      }
    });
  }

  render() {
    return (
      <div className={styles.commentableText} onMouseUp={this.onMouseUp}>
        {this.renderText()}
        {this.renderToolbar()}
        {/* this.renderSelection() */}
      </div>
    );
  }

  renderSelection() {
    const selection = this.state.selection;
    
    if (!selection) {
      return;
    }

    const paragraph = this.props.text.split(/\n+/)[selection.paragraph];

    return <Paragraph text={paragraph} index={selection.paragraph} highlight={{ quote: selection }} />;
  }

  renderText() {
    const paragraphs = this.props.text.split(/\n+/);
    const highlightedComment = this.props.highlightedComment;

    return paragraphs.map((text, i) => {
      return (
        <Paragraph
          key={i}
          text={text}
          index={i}
          highlight={highlightedComment && highlightedComment.quote.paragraph === i && highlightedComment}
        />
      );
    });
  }

  renderToolbar() {
    const { selection } = this.state;

    if (!selection) {
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
