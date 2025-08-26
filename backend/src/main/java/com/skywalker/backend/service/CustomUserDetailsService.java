    package com.skywalker.backend.service;

    import com.skywalker.backend.exception.OurException;
    import com.skywalker.backend.repository.UserRepository;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.stereotype.Service;

    @Service
    @RequiredArgsConstructor
    public class CustomUserDetailsService implements UserDetailsService {

        private final UserRepository repository;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            return (UserDetails) repository.findByEmail(username)
                    .orElseThrow(()-> new OurException("UserName/Email not found"));
        }
    }
