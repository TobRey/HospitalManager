<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitb41a7d7e7ad3c7dbb143b8d32b3fb85f
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInitb41a7d7e7ad3c7dbb143b8d32b3fb85f', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitb41a7d7e7ad3c7dbb143b8d32b3fb85f', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitb41a7d7e7ad3c7dbb143b8d32b3fb85f::getInitializer($loader));

        $loader->register(true);

        $includeFiles = \Composer\Autoload\ComposerStaticInitb41a7d7e7ad3c7dbb143b8d32b3fb85f::$files;
        foreach ($includeFiles as $fileIdentifier => $file) {
            composerRequireb41a7d7e7ad3c7dbb143b8d32b3fb85f($fileIdentifier, $file);
        }

        return $loader;
    }
}

/**
 * @param string $fileIdentifier
 * @param string $file
 * @return void
 */
function composerRequireb41a7d7e7ad3c7dbb143b8d32b3fb85f($fileIdentifier, $file)
{
    if (empty($GLOBALS['__composer_autoload_files'][$fileIdentifier])) {
        $GLOBALS['__composer_autoload_files'][$fileIdentifier] = true;

        require $file;
    }
}
