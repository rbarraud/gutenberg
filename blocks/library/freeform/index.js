/**
 * WordPress dependencies
 */
import { __ } from 'i18n';

/**
 * Internal dependencies
 */
import './style.scss';
import { registerBlockType, source, setUnknownTypeHandler } from '../../api';
import OldEditor from './old-editor';

const { prop } = source;

registerBlockType( 'core/freeform', {
	title: __( 'Classic Text' ),

	icon: 'editor-kitchensink',

	category: 'formatting',

	attributes: {
		content: prop( 'innerHTML' ),
	},

	edit: OldEditor,

	save( { attributes } ) {
		const { content } = attributes;
		return content;
	},
} );

setUnknownTypeHandler( 'core/freeform' );
