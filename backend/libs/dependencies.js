const dependencies = {};

export function getDependency(name) {
  if (!dependencies[name]) {
    throw new Error(`Dependency ${name} not found`);
  }
  
  return dependencies[name];
}

export function addDependency(name, dependency) {
    if (dependencies[name]) {
        throw new Error(`Dependency ${name} already exists`);
    }
    dependencies[name] = dependency;
}

// Utilidades adicionales
export function hasDependency(name) {
  return Boolean(dependencies[name]);
}

export function removeDependency(name) {
  if (!dependencies[name]) {
    throw new Error(`Dependency ${name} not found`);
  }
  delete dependencies[name];
}

