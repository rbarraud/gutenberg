/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import {
	getBlockType,
	getUnknownTypeHandlerName,
	createBlock,
} from '@wordpress/blocks';
import { Dashicon, Button } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { replaceBlock } from '../../actions';

function InvalidBlockWarning( { switchToDefaultType } ) {
	const defaultBlockType = getBlockType( getUnknownTypeHandlerName() );

	return (
		<div className="editor-visual-editor__invalid-block-warning">
			<Dashicon icon="warning" />
			<p>{ __(
				'This block has been modified externally and has been locked to ' +
				'protect against content loss.'
			) }</p>
			{ defaultBlockType && (
				<p>
					<Button
						onClick={ switchToDefaultType }
						isLarge
					>
						{
							/* translators: Revert invalid block to default */
							sprintf( __( 'Convert to %s' ), defaultBlockType.title )
						}
					</Button>
				</p>
			) }
		</div>
	);
}

export default connect(
	null,
	( dispatch, ownProps ) => {
		return {
			switchToDefaultType() {
				const defaultBlockName = getUnknownTypeHandlerName();
				const { block } = ownProps;
				if ( defaultBlockName && block ) {
					const nextBlock = createBlock( defaultBlockName, {
						content: block.originalContent,
					} );

					dispatch( replaceBlock( block.uid, nextBlock ) );
				}
			},
		};
	}
)( InvalidBlockWarning );
