/**
 * External dependencies
 */
import { times } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from 'i18n';

/**
 * Internal dependencies
 */
import './block.scss';
import './style.scss';
import { registerBlockType, query as hpq } from '../../api';
import BlockControls from '../../block-controls';
import BlockAlignmentToolbar from '../../block-alignment-toolbar';
import RangeControl from '../../inspector-controls/range-control';
import Editable from '../../editable';
import InspectorControls from '../../inspector-controls';
import BlockDescription from '../../block-description';

const { children, query } = hpq;

registerBlockType( 'core/text-columns', {
	title: __( 'Text Columns' ),

	icon: 'columns',

	category: 'formatting',

	attributes: {
		content: query( 'p', children() ),
	},

	defaultAttributes: {
		columns: 2,
		content: [ [], [] ],
	},

	getEditWrapperProps( attributes ) {
		const { width } = attributes;
		if ( 'wide' === width || 'full' === width ) {
			return { 'data-align': width };
		}
	},

	edit( { attributes, setAttributes, className, focus, setFocus, settings } ) {
		const { width, content, columns } = attributes;

		return [
			focus && (
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						value={ width }
						onChange={ ( nextWidth ) => setAttributes( { width: nextWidth } ) }
						wideControlsEnabled={ settings.wideImages }
					/>
				</BlockControls>
			),
			focus && (
				<InspectorControls key="inspector">
					<BlockDescription>
						<p>{ __( 'Text. Great things start here.' ) }</p>
					</BlockDescription>
					<RangeControl
						label={ __( 'Columns' ) }
						value={ columns }
						onChange={ ( event ) => setAttributes( { columns: event.target.value } ) }
						min="2"
						max="4"
					/>
				</InspectorControls>
			),
			<div className={ `${ className } align${ width } columns-${ columns }` } key="block">
				{ times( columns, ( index ) =>
					<div className="wp-block-text-columns__column">
						<Editable
							key={ `editable-${ index }` }
							tagName="p"
							value={ content && content[ index ] }
							onChange={ ( nextContent ) => {
								setAttributes( {
									content: [
										...content.slice( 0, index ),
										nextContent,
										...content.slice( index + 1 ),
									],
								} );
							} }
							focus={ focus && focus.column === index }
							onFocus={ () => setFocus( { column: index } ) }
							placeholder={ __( 'New Column' ) }
						/>
					</div>
				) }
			</div>,
		];
	},

	save( { attributes } ) {
		const { width, content, columns } = attributes;
		return (
			<div className={ `align${ width } columns-${ columns }` }>
				{ times( columns, ( index ) =>
					<div className="wp-block-text-columns__column">
						<p>{ content && content[ index ] }</p>
					</div>
				) }
			</div>
		);
	},
} );
