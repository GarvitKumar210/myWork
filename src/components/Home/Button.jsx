const base =
  'inline-flex items-center justify-center gap-2 rounded-full border-2 border-transparent px-7 py-3.5 text-base font-semibold leading-tight transition duration-200'

const variants = {
  hire: `${base} min-w-[8.5rem] bg-green text-white shadow-green hover:-translate-y-px hover:bg-green-hover hover:shadow-green-lg`,
  ghost: `${base} border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-navy/5`,
}

export function Button({
  href,
  variant = 'hire',
  className = '',
  children,
  ...props
}) {
  const classes = `${variants[variant] ?? variants.hire} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
