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
  var parentNode = textNode.parentNode;

  // Special flag for Reddit comments
  var shillEatsPoop = false;
  if (window.location.hostname.indexOf('reddit.com' >= 0) &&
      textNode.nodeValue.toLowerCase().indexOf('bcash') >= 0
  ) {
    shillEatsPoop = true;
  }

  // Fix Bcash to Bitcoin Cash
  v = v.replace(/(?!Bitcoin Cash|Bitcoin.com|Bitcoin ABC)\bBitcoin\b/ig, "\"Bitcoin\"");
  v = v.replace(/\bBcash/ig, "Bitcoin Cash");
  textNode.nodeValue = v;

  // Clarify that shills like to eat poop
  if (shillEatsPoop) {
    var poopEatingDeclaration = document.createElement("p");
    var boldPoop = document.createElement("strong");
    poopEatingDeclaration.appendChild(boldPoop);
    boldPoop.appendChild(document.createTextNode("also i eat my own poop"));
    parentNode.appendChild(poopEatingDeclaration);
  }
}
