/**
 * External dependencies
 */
import clickOutside from 'react-click-outside';
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { IconButton } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import InserterMenu from './menu';
import { getBlockInsertionPoint, getEditorMode } from '../selectors';
import { insertBlock, hideInsertionPoint } from '../actions';
import { bumpStat } from '../utils/tracking';

class Inserter extends Component {
	constructor() {
		super( ...arguments );
		this.toggle = this.toggle.bind( this );
		this.close = this.close.bind( this );
		this.insertBlock = this.insertBlock.bind( this );
		this.state = {
			opened: false,
		};
	}

	toggle() {
		this.setState( ( state ) => ( {
			opened: ! state.opened,
		} ) );
	}

	close() {
		this.setState( {
			opened: false,
		} );
	}

	insertBlock( name ) {
		if ( name ) {
			const { insertionPoint, onInsertBlock } = this.props;
			onInsertBlock(
				name,
				insertionPoint
			);
			bumpStat( 'add_block_inserter', name.replace( /\//g, '__' ) );
			bumpStat( 'add_block_total', name.replace( /\//g, '__' ) );
		}

		this.close();
	}

	handleClickOutside() {
		if ( ! this.state.opened ) {
			return;
		}

		this.close();
	}

	render() {
		const { opened } = this.state;
		const { position, children } = this.props;

		return (
			<div className="editor-inserter">
				<IconButton
					icon="insert"
					label={ __( 'Insert block' ) }
					onClick={ this.toggle }
					className="editor-inserter__toggle"
					aria-haspopup="true"
					aria-expanded={ opened }
				>
					{ children }
				</IconButton>
				{ opened && (
					<InserterMenu
						position={ position }
						onSelect={ this.insertBlock }
					/>
				) }
			</div>
		);
	}
}

export default connect(
	( state ) => {
		return {
			insertionPoint: getBlockInsertionPoint( state ),
			mode: getEditorMode( state ),
		};
	},
	( dispatch ) => ( {
		onInsertBlock( name, after ) {
			dispatch( hideInsertionPoint() );
			dispatch( insertBlock(
				createBlock( name ),
				after
			) );
		},
	} )
)( clickOutside( Inserter ) );
