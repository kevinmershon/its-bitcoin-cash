walk(document.body);

function walk(node)
{
	// PanicSteve stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

  if (node.tagName && (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea'
    || node.classList.contains('ace_editor'))) {
		return;
	}

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{
	var v = textNode.nodeValue;

	v = v.replace(/(?!Bitcoin Cash|Bitcoin.com)\bBitcoin\b/ig, "\"Bitcoin\"");
	v = v.replace(/\bBcash\b/ig, "Bitcoin Cash");

	textNode.nodeValue = v;
}


