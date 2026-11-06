/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Toolbox that uses a continuous scrolling flyout.
 */

class ContinuousToolbox extends Blockly.Toolbox {
  /** @override */
  constructor(workspace) {	  
    super(workspace);
	
	workspace.eventHistory = [];	

    workspace.addChangeListener((event) => {
		let eventWorkspace = Blockly.Workspace.getById(event.workspaceId);
		eventWorkspace.eventHistory.push([event.type, event.oldJson || null, event.blockId || null]);
		
		var continuousFlyout = eventWorkspace.toolbox_.flyout_;
		if (continuousFlyout.autoClose) {
			if (event.type == "toolbox_item_select" && continuousFlyout.isVisible_ == false&&event.newItem) {
				continuousFlyout.setVisible(true);
				eventWorkspace.resize();
			} else if (event.type == "toolbox_item_select" && (!event.newItem) && continuousFlyout.isVisible_ == true) {
				continuousFlyout.setVisible(false);
				eventWorkspace.resize();
				continuousFlyout.getParentToolbox_().clearSelection();
			}	
		}			
    });
  }

  /** @override */
  init() {  
    super.init();
	
    // Populate the flyout with all blocks and show it immediately.
    const flyout = this.getFlyout();
    flyout.show(this.getInitialFlyoutContents_());
    flyout.recordScrollPositions();
	
	if(flyout.autoClose)
		flyout.setVisible(false);
	
	this.workspace_.eventHistory = [];	

    this.workspace_.addChangeListener((event) => {
		if (event.type === Blockly.Events.BLOCK_CREATE) {
			this.refreshSelection();
		}  
    });
  }

  /** @override */
  getFlyout() {	  
    return /** @type {ContinuousFlyout} */ (super.getFlyout());
  }

  /**
   * Gets the contents that should be shown in the flyout immediately.
   * This includes all blocks and labels for each category of block.
   * @return {!Blockly.utils.toolbox.FlyoutItemInfoArray} Flyout contents.
   * @private
   */
  getInitialFlyoutContents_() {  
    /** @type {!Blockly.utils.toolbox.FlyoutItemInfoArray} */
    let contents = [];
    for (const toolboxItem of this.contents_) {
      if (toolboxItem instanceof Blockly.ToolboxCategory) {
		if (toolboxItem.toolboxItemDef_.elementname === undefined) {
			// Create a label node to go at the top of the category
			contents.push({kind: 'LABEL', text: toolboxItem.getName()});
			/**
			 * @type {string|Blockly.utils.toolbox.FlyoutItemInfoArray|
			 *    Blockly.utils.toolbox.FlyoutItemInfo}
			 */			 
			let itemContents = toolboxItem.getContents();

			// Handle custom categories (e.g. variables and functions)
			if (typeof itemContents === 'string') {
			  itemContents =
				/** @type {!Blockly.utils.toolbox.DynamicCategoryInfo} */ ({
				  custom: itemContents,
				  kind: 'CATEGORY',
				});
			}
			contents = contents.concat(itemContents);
		}
      }
    }
    return contents;
  }

  /** @override */
  refreshSelection() {
      if (this.refreshDebouncer) {
        clearTimeout(this.refreshDebouncer);
      }
      this.refreshDebouncer = setTimeout(() => {
        this.getFlyout().show(this.getInitialFlyoutContents_());
      }, 100);
  }

  /** @override */
  updateFlyout_(_oldItem, newItem) {	  
    if (newItem) {
	  if (newItem.toolboxItemDef_.elementname === undefined) {
		  const target = this.getFlyout()
			  .getCategoryScrollPosition(newItem.name_).y;
		  this.getFlyout().scrollTo(target);
	  }
    }
  }

  /** @override */
  shouldDeselectItem_(oldItem, newItem) {	  
    // Should not deselect if the same category is clicked again.
    return (oldItem && oldItem !== newItem);
  }

  /**
   * Gets a category by name.
   * @param {string} name Name of category to get.
   * @return {?Blockly.ToolboxCategory} Category, or null if not
   *    found.
   * @package
   */
  getCategoryByName(name) {	  
    const category = this.contents_.find(
        (item) => item instanceof Blockly.ToolboxCategory &&
            item.isSelectable() && name === item.getName());
    if (category) {
      return /** @type {!Blockly.ToolboxCategory} */ (category);
    }
    return null;
  }

  /**
   * Selects the category with the given name.
   * Similar to setSelectedItem, but importantly, does not call updateFlyout
   * because this is called while the flyout is being scrolled.
   * @param {string} name Name of category to select.
   * @package
   */
  selectCategoryByName(name) {	  
    const newItem = this.getCategoryByName(name);
    if (!newItem) {
      return;
    }
    const oldItem = this.selectedItem_;

    if (this.shouldDeselectItem_(oldItem, newItem)) {
      this.deselectItem_(oldItem);
    }

    if (this.shouldSelectItem_(oldItem, newItem)) {
      this.selectItem_(oldItem, newItem);
    }
  }

  /** @override */
  getClientRect() {	  
    // If the flyout never closes, it should be the deletable area.
    const flyout = this.getFlyout();
    if (flyout && !flyout.autoClose) {
      return flyout.getClientRect();
    }
    return super.getClientRect();
  }
}


Blockly.Css.register([
  `.categoryBubble {
      margin: 0 auto 0.125rem;
      border-radius: 100%;
      border: 1px solid;
      width: 1.25rem;
      height: 1.25rem;
    }
    .blocklyTreeLabel {
      margin: auto;
    }
	/* Makes our label white. */
	.blocklyTreeLabel {
	  color: white;
	}
	/* Adds padding around the group of categories and separators. */
	.blocklyToolboxContents {
	  padding: .5em;
	}
	/* Adds space between the categories, rounds the corners and adds space around the label. */
	.blocklyTreeRow {
	  padding: 3px;
	  margin-bottom: .5em;
	  border-radius: 4px;
	}
	/* Changes color of the icon to white. */
	.customIcon {
	  color: white;
	}
	/* Stacks the icon on top of the label. */
	.blocklyTreeRowContentContainer {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  height: 100%;	 	  
	}
	.blocklyTreeRow {
	  height: initial;
	}`
]);