/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import { sprintf, _n, __ } from 'i18n';
import { IconButton } from 'components';

/**
 * Internal dependencies
 */
import './style.scss';
import ModeSwitcher from './mode-switcher';
import SavedState from './saved-state';
import Tools from './tools';
import { isEditorSidebarOpened, getMultiSelectedBlockUids } from '../selectors';
import { clearSelectedBlock } from '../actions';

function Header( { multiSelectedBlockUids, onRemove, onDeselect, isSidebarOpened, toggleSidebar } ) {
	const count = multiSelectedBlockUids.length;

	if ( count ) {
		return (
			<header className="editor-header editor-header-multi-select">
				<div className="editor-selected-count">
					{ sprintf( _n( '%d block selected', '%d blocks selected', count ), count ) }
				</div>
				<div className="editor-selected-delete">
					<IconButton
						icon="trash"
						label={ __( 'Delete selected blocks' ) }
						onClick={ () => onRemove( multiSelectedBlockUids ) }
						focus={ true }
					>
						{ __( 'Delete' ) }
					</IconButton>
				</div>
				<div className="editor-tools">
					<div className="editor-tools__tabs">
						<IconButton icon="admin-generic" onClick={ toggleSidebar } isToggled={ isSidebarOpened }>
							{ __( 'Post Settings' ) }
						</IconButton>
					</div>
					<div className="editor-selected-clear">
						<IconButton
							icon="no"
							label={ __( 'Clear selected blocks' ) }
							onClick={ () => onDeselect() }
						/>
					</div>
				</div>
			</header>
		);
	}

	return (
		<header className="editor-header">
			<ModeSwitcher />
			<SavedState />
			<Tools />
		</header>
	);
}

export default connect(
	( state ) => ( {
		multiSelectedBlockUids: getMultiSelectedBlockUids( state ),
		isSidebarOpened: isEditorSidebarOpened( state ),
	} ),
	( dispatch ) => ( {
		toggleSidebar: () => dispatch( { type: 'TOGGLE_SIDEBAR' } ),
		onDeselect: () => dispatch( clearSelectedBlock() ),
		onRemove: ( uids ) => dispatch( {
			type: 'REMOVE_BLOCKS',
			uids,
		} ),
	} )
)( Header );
