/**
 * External dependencies
 */
import { connect } from 'react-redux';
import Textarea from 'react-autosize-textarea';

/**
 * WordPress dependencies
 */
import { Component } from 'element';

/**
 * Internal dependencies
 */
import './style.scss';
import PostTitle from '../../post-title';

class TextEditor extends Component {
	constructor( props ) {
		super( ...arguments );
		this.onChange = this.onChange.bind( this );
		this.onBlur = this.onBlur.bind( this );
		this.state = {
			value: props.value,
		};
	}

	componentWillReceiveProps( newProps ) {
		if ( newProps.value !== this.props.value ) {
			this.setState( { value: newProps.value } );
		}
	}

	onChange( event ) {
		this.setState( { value: event.target.value } );
		this.props.markDirty();
	}

	onBlur() {
		this.props.onChange( this.state.value );
	}

	render() {
		return (
			<div className="editor-text-editor">
				<header className="editor-text-editor__formatting">
					<div className="editor-text-editor__formatting-group">
						<button className="editor-text-editor__bold">b</button>
						<button className="editor-text-editor__italic">i</button>
						<button className="editor-text-editor__link">link</button>
						<button>b-quote</button>
						<button className="editor-text-editor__del">del</button>
						<button>ins</button>
						<button>img</button>
						<button>ul</button>
						<button>ol</button>
						<button>li</button>
						<button>code</button>
						<button>more</button>
						<button>close tags</button>
					</div>
				</header>
				<div className="editor-text-editor__body">
					<PostTitle />
					<Textarea
						autoComplete="off"
						value={ this.state.value }
						onChange={ this.onChange }
						onBlur={ this.onBlur }
						className="editor-text-editor__textarea"
					/>
				</div>
			</div>
		);
	}
}

export default connect(
	undefined,
	{
		markDirty: () => ( {
			type: 'MARK_DIRTY',
		} ),
	}
)( TextEditor );