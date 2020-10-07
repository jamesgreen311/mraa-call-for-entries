/**
 * Generate a unique identifier.
 * @return {string} id 
 */
function generateUniqueId() {
    return Math.floor(Math.random() * Math.floor(100000000)).toString(16).toUpperCase();
}